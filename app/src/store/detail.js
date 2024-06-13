import { reqGoodsInfo } from "@/api/api"

export default{
    state:{
        goodsInfo:{}
    },
    mutations:{
        // 接收商品详情信息
        RECEIVE_GOODSINFO(state,goodsInfo){
            state.goodsInfo = goodsInfo
        }
    },
    actions:{
        // 获取商品详情信息
        async getGoodsInfo({commit},skuId){
            const result = await reqGoodsInfo(skuId)
            if(result.code === 200){
                commit('RECEIVE_GOODSINFO',result.data.data)
            }
        }
    },
    getters:{
        categoryView(state){
            return state.goodsInfo.categoryView || {}
        },
        skuInfo(state){
            return state.goodsInfo.skuInfo || {}
        },
        spuSaleAttrList(state){
            return state.goodsInfo.spuSaleAttrList || []
        },
        skuImageList(state){
            return state.goodsInfo.skuImageList || []
        }
    }
}