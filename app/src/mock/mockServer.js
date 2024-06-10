import Mock from 'mockjs';
import banner from "./banner.json";
import floor from "./floor.json";

Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
// 以上代码是对mock数据的模拟，模拟了banner和floor两个接口的数据
