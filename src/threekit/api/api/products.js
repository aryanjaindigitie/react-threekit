// import fs from 'fs'
// import path from 'path'
import { validate as uuidValidate } from 'uuid';
import { connect, getConnection } from './connect';
import http from '../http';
// import FormData from 'form-data'
// import csvParser from 'csv-parser'

//  Query Example
const query = {
  id: 'value',
  assetId: 'value',
  name: 'value',
  tags: 'value',
  'metadata.key': 'value',
};

// export const findById = (
//     productId: string,
//     returnFieldsString: string,
//     options: any
// ) =>
//     new Promise(async (resolve) => {
//         const connectionObj = getConnection()
//         if (!connectionObj && !options?.connection?.authToken) {
//             console.error('Please connect to threekit')
//             return resolve(false)
//         }
//         if (!connectionObj) connect(options.connection)

//         if (!uuidValidate(productId)) {
//             console.error('Invalid Product Id')
//             return resolve(false)
//         }

//         try {
//             const response = await http.products.getItemById(productId)
//             if (response.status !== 200) {
//                 console.error(
//                     'something went wrong with the product rest request'
//                 )
//                 console.error(response.data)
//                 return resolve(false)
//             }
//             resolve(response.data.products)
//         } catch (err) {
//             console.error(err)
//             resolve(false)
//         }
//     })

export const find = (query, returnFieldsString, options) =>
  new Promise(async (resolve, reject) => {
    if (options?.connection) connect(options.connection);
    const connectionObj = getConnection();
    if (!connectionObj) {
      console.error('Please connect to threekit');
      reject();
    }
    
try {
      const response = await http.catalog.getAllItems();
      if (response.status !== 200) {
        console.error(response.data);
        reject();
      }
      resolve(response.data.products);
    } catch (err) {
      console.error(err);
      reject();
    }
  });

// export const populate = (data, prepFunction, options) =>
//     new Promise(async (resolve) => {
//         const connectionObj = getConnection()
//         if (!data) {
//             console.error('Nothing to populate')
//             return resolve(false)
//         }

//         if (!connectionObj && !options?.connection?.authToken) {
//             console.error('Please connect to threekit')
//             return resolve(false)
//         }
//         if (!connectionObj) connect(options.connection)

//         let existingItems
//         let newItems
//         let existingItemsSet = new Set([])

//         try {
//             const response = await http.products.getAllItems()
//             if (response.status !== 200) {
//                 console.error(response.data)
//                 return resolve(false)
//             }
//             existingItems = response.data
//         } catch (err) {
//             console.error(err)
//             return resolve(false)
//         }

//         existingItems.map((el) => existingItemsSet.add(el.product.name))

//         if (typeof data === 'object' || Array.isArray(data)) {
//             const items = Array.isArray(data) ? data : [data]
//             newItems = newItems = items.map((item) =>
//                 prepFunction ? prepFunction(item) : item
//             )
//         } else {
//             const fileFormat = data.split('.')[data.split('.').length - 1]

//             if (fileFormat === 'csv') {
//                 let results = []
//                 await new Promise((resolve) => {
//                     fs.createReadStream(
//                         path.join(__dirname, '../../', data),
//                         'utf8'
//                     )
//                         .pipe(csvParser())
//                         .on('data', (data) => results.push(data))
//                         .on('end', () => {
//                             newItems = results.map((item) =>
//                                 prepFunction ? prepFunction(item) : item
//                             )
//                             resolve(true)
//                         })
//                 })
//             } else if (fileFormat === 'json') {
//                 try {
//                     const jsonData = JSON.parse(
//                         fs.readFileSync(
//                             path.join(__dirname, '../../', data),
//                             'utf8'
//                         )
//                     )
//                     const items = Array.isArray(jsonData)
//                         ? jsonData
//                         : [jsonData]
//                     newItems = items.map((item) =>
//                         prepFunction ? prepFunction(item) : item
//                     )
//                 } catch (err) {
//                     console.error('issue reading json file')
//                     resolve(false)
//                 }
//             }
//         }

//         if (
//             !(
//                 options &&
//                 'removeDuplicates' in options &&
//                 options.removeDuplicates === false
//             )
//         )
//             newItems = newItems.filter((el) => {
//                 if (existingItemsSet.has(el.product.name)) return false
//                 existingItemsSet.add(el.product.name)
//                 return true
//             })

//         const preppedItems = [...existingItems, ...newItems]

//         const form = new FormData()
//         form.append('file', Buffer.from(JSON.stringify(preppedItems)), {
//             filename: 'products-upload.json',
//         })

//         try {
//             const response = await http.products.populateItems(form)
//             if (response.status !== 200) {
//                 console.error(response.data)
//                 return resolve(false)
//             }
//             resolve(response.data.products)
//         } catch (err) {
//             console.error(err)
//             return resolve(false)
//         }
//     })

// export const exportAll = (options: QueryOptions) =>
//     new Promise(async (resolve) => {
//         const connectionObj = getConnection()
//         if (!connectionObj && !options?.connection) {
//             console.error('Please connect to threekit')
//             return resolve(false)
//         }
//         if (!connectionObj) connect(options.connection)

//         try {
//             const response = await http.products.getAllItems()
//             if (response.status !== 200) {
//                 console.error(response.data)
//                 return resolve(false)
//             }
//             resolve(response.data)
//         } catch (err) {
//             console.error(err)
//             return resolve(false)
//         }
//     })

export const getTranslationMap = () =>
  new Promise(async (resolve, reject) => {
    let response;
    try {
      response = await http.products.getTranslations();
    } catch (e) {
      reject(e);
    }
    const csvData = response.data
      .replaceAll('"', '')
      .split('\n')
      .map((el) => el.split(','));
    const languages = csvData[0];
    const translationMap = csvData.reduce((output, row, idx) => {
      if (!idx) return output;
      output[row[0]] = row.reduce((result, el, i) => {
        if (!i) return result;
        return Object.assign(result, {
          [languages[i]]: el.length ? el : undefined,
        });
      }, {});

      return output;
    }, {});
    resolve(translationMap);
  });
