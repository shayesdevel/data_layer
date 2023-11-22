import {DataLayer} from "./DataLayer";

beforeAll(async () => {
    await DataLayer.connect();
});

beforeEach(async () => {

});

afterEach(async () => {

});

test('Repository Count Test', async () => {
    expect.assertions(1);
    //return DataLayer.accountRepository.count().then((value) => expect(value).toEqual(0));
});