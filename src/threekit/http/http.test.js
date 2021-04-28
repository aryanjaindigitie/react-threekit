import { objectToQueryStr } from './utils';
import { getAllItems, getItemById } from './catalog';
import { getSavedConfiguration } from './configurations';

const catalogItemId = '356be3a5-834d-4d42-96ec-cfb565d34c68';

describe('HTTP utils', () => {
  describe('Object To Query String - objectToQueryStr()', () => {
    test('It should return an empty string if an empty obj is provided', () => {
      const result1 = objectToQueryStr();
      const result2 = objectToQueryStr({});

      expect(result1).toBe('');
      expect(result2).toBe('');
    });

    test('It should return a formatted string', () => {
      const obj = { arsenal: 5, tottenham: 'nil' };
      const result = objectToQueryStr(obj);
      expect(result).toBe('?arsenal=5&tottenham=nil');
    });
  });
});

describe('Catalog Service Requests', () => {
  test('Get All Items - getAllItems()', async () => {
    const response = await getAllItems();
    expect(response.status).toBe(200);
    expect(!!response.data?.products?.length).toBe(true);
  });

  describe('Get Item by ID - getItemById()', () => {
    test('Requires an ID', () => {
      expect(() => getItemById()).toThrow('Requires Catalog Item ID');
    });

    test('Returns an Item when a valid ID is provided', async () => {});
  });
});

describe('Configuration Service Requests', () => {
  test('Get All Items - getAllItems()', async () => {
    // const response = await getSavedConfiguration();
    // expect(response.status).toBe(200);
  });
});
