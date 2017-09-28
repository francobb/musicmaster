const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const webdriver = require('selenium-webdriver');
const until = webdriver.until;
const By = webdriver.By;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


describe('Music Master end to end test', function(done) {

  this.timeout(100000);

  after(function(done) {
    driver.quit()
        .then(() => done())
  });

  it('should enter name + execute search', (done) => {
    driver.navigate().to('http://localhost:3000/')
        .then(() => {
          driver.wait(until.elementLocated(By.css('.form-control'))).then((item) => {
            item.sendKeys('Bob Marley');
            item.sendKeys(webdriver.Key.ENTER);
            driver.sleep(5000);
          });
        })
        .then(() => {
          expect(driver.findElement(By.css('.track'))).to.exist;
          done()
        });
  })

});