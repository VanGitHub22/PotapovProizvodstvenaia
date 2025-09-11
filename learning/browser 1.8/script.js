function showNotification({top = 0, left = 0, className, html}) {

  let notification = document.createElement('div');
  notification.className = "notification";
  if (className) {
    notification.classList.add(className);
  }

  notification.style.top = top + 'px';
  notification.style.left = left + 'px';

  notification.innerHTML = html;
  document.body.append(notification);

  setTimeout(() => notification.remove(), 1500);
}

// test it
let i = 1;
setInterval(() => {
  showNotification({
    top: 10+i*10,
    left: 10+i*10,
    html: 'Hello ' + i++,
    className: "welcome"
  });
}, 2000);