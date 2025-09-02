describe("pow", function(){
  let x = 5;
  let result = x;
  
  
  it("Возводит x в степень n", function() {
    assert.equal(pow(x, 1), result);
  });
  it("Возводит x в степень n", function() {
    result *= x;
    assert.equal(pow(x, 2), result);
  });
  it("Возводит x в степень n", function() {
    result *= x;
    assert.equal(pow(x, 3), result);
  });
})

