describe("pow", function() {

    /*before(() => alert("Тестирование началось – перед тестами"));
    after(() => alert("Тестирование закончилось – после всех тестов"));

    beforeEach(() => alert("Перед тестом – начинаем выполнять тест"));
    afterEach(() => alert("После теста – заканчиваем выполнение теста"));*/

    describe("возводит x в степень 3", function() {

    function makeTest(x) {
        let expected = x * x * x;
        it(`${x} в степени 3 будет ${expected}`, function() {
            assert.equal(pow(x, 3), expected);
        });
        }

        for (let x = 1; x <= 5; x++) {
        makeTest(x);
        }

    });

    if (n < 0) return NaN;
    if (Math.round(n) != n) return NaN;

    function makeTest(x) {
        let expected = x * x * x;
        it(`${x} в степени 3 будет ${expected}`, function() {
            assert.equal(pow(x, 3), expected);
        });
    }

    for (let x = 1; x <= 5; x++) {
        makeTest(x);
    }

    it("2 в степени 3 будет 8", function() {
        assert.equal(pow(2, 3), 8);
    });

    it("3 в степени 3 будет 27", function() {
        assert.equal(pow(3, 3), 27);
    });

});