/*let tooltip;

document.onmouseover = function(event) {
  // важно: быстро движущийся курсор может прыгнуть сразу к дочернему элементу, пропустив родительский
  // так что событие mouseover произойдёт сразу на дочернем элементе.

  let anchorElem = event.target.closest('[data-tooltip]');

  if (!anchorElem) return;

  // показываем подсказку и запоминаем её
  tooltip = showTooltip(anchorElem, anchorElem.dataset.tooltip);
}

document.onmouseout = function() {
  // возможно такое, что произошло событие mouseout, но мы всё ещё внутри элемента
  // (оно было где-то внутри и всплыло)
  // но в этом случае сразу же последует событие mouseover,
  // то есть подсказка исчезнет и потом снова покажется
  //
  // к счастью, этого не будет видно,
  // так как оба события происходят почти одновременно
  if (tooltip) {
    tooltip.remove();
    tooltip = false;
  }

}


function showTooltip(anchorElem, html) {
  let tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip';
  tooltipElem.innerHTML = html;
  document.body.append(tooltipElem);

  let coords = anchorElem.getBoundingClientRect();

  // позиционируем подсказку над центром элемента
  let left = coords.left + (anchorElem.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) left = 0;

  let top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) {
    top = coords.top + anchorElem.offsetHeight + 5;
  }

  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';

  return tooltipElem;
}*/


class HoverIntent {

  constructor({
    sensitivity = 0.1, // скорость ниже 0.1px/ms значит "курсор на элементе"
    interval = 100,    // измеряем скорость каждые 100ms
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // убедитесь, что "this" сохраняет своё значение для обработчиков.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // и в функции, измеряющей время (вызываемой из setInterval)
    this.trackSpeed = this.trackSpeed.bind(this);

    elem.addEventListener("mouseover", this.onMouseOver);

    elem.addEventListener("mouseout", this.onMouseOut);

  }

  onMouseOver(event) {

    if (this.isOverElement) {
      // Игнорируем событие над элементом,
      // так как мы уже измеряем скорость
      return;
    }

    this.isOverElement = true;

    // после каждого движения измеряем дистанцию
    // между предыдущими и текущими координатами курсора
    // если скорость меньше sensivity, то она считается медленной

    this.prevX = event.pageX;
    this.prevY = event.pageY;
    this.prevTime = Date.now();

    elem.addEventListener('mousemove', this.onMouseMove);
    this.checkSpeedInterval = setInterval(this.trackSpeed, this.interval);
  }

  onMouseOut(event) {
    // если ушли с элемента
    if (!event.relatedTarget || !elem.contains(event.relatedTarget)) {
      this.isOverElement = false;
      this.elem.removeEventListener('mousemove', this.onMouseMove);
      clearInterval(this.checkSpeedInterval);
      if (this.isHover) {
        // если была остановка движения на элементе
        this.out.call(this.elem, event);
        this.isHover = false;
      }
    }
  }

  onMouseMove(event) {
    this.lastX = event.pageX;
    this.lastY = event.pageY;
    this.lastTime = Date.now();
  }

  trackSpeed() {

    let speed;

    if (!this.lastTime || this.lastTime == this.prevTime) {
      // курсор не двигался
      speed = 0;
    } else {
      speed = Math.sqrt(
        Math.pow(this.prevX - this.lastX, 2) +
        Math.pow(this.prevY - this.lastY, 2)
      ) / (this.lastTime - this.prevTime);
    }

    if (speed < this.sensitivity) {
      clearInterval(this.checkSpeedInterval);
      this.isHover = true;
      this.over.call(this.elem);
    } else {
      // скорость высокая, запоминаем новые координаты
      this.prevX = this.lastX;
      this.prevY = this.lastY;
      this.prevTime = this.lastTime;
    }
  }

  destroy() {
    elem.removeEventListener('mousemove', this.onMouseMove);
    elem.removeEventListener('mouseover', this.onMouseOver);
    elem.removeEventListener('mouseout', this.onMouseOut);
  }

}

setTimeout(function() {
  new HoverIntent({
    elem,
    over() {
      tooltip.style.left = elem.getBoundingClientRect().left + 5 + 'px';
      tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
      tooltip.hidden = false;
    },
    out() {
      tooltip.hidden = true;
    }
  });
}, 2000);

describe("hoverIntent", function() {

  function mouse(eventType, x, y, options) {
    let eventOptions = Object.assign({
      bubbles: true,
      clientX: x,
      clientY: y,
      pageX: x,
      pageY: y,
      target: elem
    }, options || {});

    elem.dispatchEvent(new MouseEvent(eventType, eventOptions));
  }


  let isOver;
  let hoverIntent;


  before(function() {
    this.clock = sinon.useFakeTimers();
  });

  after(function() {
    this.clock.restore();
  });


  beforeEach(function() {
    isOver = false;

    hoverIntent = new HoverIntent({
      elem: elem,
      over: function() {
        isOver = true;
      },
      out: function() {
        isOver = false;
      }
    });
  })

  afterEach(function() {
    if (hoverIntent) {
      hoverIntent.destroy();
    }
  })

  it("mouseover -> immediately no tooltip", function() {
    mouse('mouseover', 10, 10);
    assert.isFalse(isOver);
  });

  it("mouseover -> pause shows tooltip", function() {
    mouse('mouseover', 10, 10);
    this.clock.tick(100);
    assert.isTrue(isOver);
  });

  it("mouseover -> fast mouseout no tooltip", function() {
    mouse('mouseover', 10, 10);
    setTimeout(
      () => mouse('mouseout', 300, 300, { relatedTarget: document.body}),
      30
    );
    this.clock.tick(100);
    assert.isFalse(isOver);
  });


  it("mouseover -> slow move -> tooltips", function() {
    mouse('mouseover', 10, 10);
    for(let i=10; i<200; i+= 10) {
      setTimeout(
        () => mouse('mousemove', i/5, 10),
        i
      );
    }
    this.clock.tick(200);
    assert.isTrue(isOver);
  });

  it("mouseover -> fast move -> no tooltip", function() {
    mouse('mouseover', 10, 10);
    for(let i=10; i<200; i+= 10) {
      setTimeout(
        () => mouse('mousemove', i, 10),
        i
      );
    }
    this.clock.tick(200);
    assert.isFalse(isOver);
  });

});

