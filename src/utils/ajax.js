import axios from "axios";

const BASE_URL = "/api";
const ajaxJSON = (url, method, data, params) => {
  return new Promise((reslove, reject) => {
    axios({
      url: BASE_URL + url,
      method,
      data,
      params,
      Headers: {
        // 'Content-Type': 'application/x-www-form-unlencoded',
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then(
      (res) => {
        if (res.status === 200) {
          reslove(res.data);
        } else {
          reject("failed");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  });
};
const ajax = (url, method, data, params) => {
  return new Promise((reslove, reject) => {
    axios({
      url: BASE_URL + url,
      method,
      data,
      params,
      Headers: {
        "Content-Type": "application/x-www-form-unlencoded",
        //   "Content-Type": "application/json;charset=utf-8",
      },
    }).then(
      (res) => {
        if (res.status === 200) {
          reslove(res.data);
        } else {
          reject("failed");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  });
};

export function getSosList(url, method, data) {
  const [{ in_three_hours, extent, area, classify }, { page_num, page_size }] =
    [data.condition, data.page_info];
  // in_three_hours=0&extent=%E7%B4%A7%E6%80%A5&classify=%E7%96%BE%E7%97%85&area=%E9%95%BF%E5%AE%81%E5%8C%BA&page_num=1&page_size=10
  // in_three_hours=${data.condition.in_three_hours}&extent=${data.condition.extent}&classify=${data.condition.classify}&area=${data.condition.area}&page_num=${data.page_info.page_num}&page_size=${data.page_info.page_size}
  // console.log(BASE_URL + url + ``);
  return ajaxJSON(
    url +
      `in_three_hours=${in_three_hours}&extent=${extent}&classify=${classify}&area=${area}&page_num=${page_num}&page_size=${page_size}`,
    method
  );
}
