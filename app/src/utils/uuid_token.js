// 用于生成UUID
import { v4 as uuidv4 } from "uuid";

export const getUUID = () => {
    
  if (localStorage.getItem("uuid")) {
    return localStorage.getItem("uuid");
  } else {
    // 生成uuid
    const uuid = uuidv4(); 
    // 保存到localStorage
    localStorage.setItem("uuid", uuid);
    return uuid;
  }
};
