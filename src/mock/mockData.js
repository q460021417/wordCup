import Mock from "mockjs";
import data from "./data.json";

// 套餐lsit
Mock.mock(/\/p\/getServeIndexVO/, {
  code: 200,
  data: data.getServeIndexVO
});
// 套餐详情
Mock.mock(/\/p\/getServeDetailVO/, {
  code: 200,
  data: data.getServeDetailVO
});
