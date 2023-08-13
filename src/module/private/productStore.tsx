import {  Reducer, useReducer } from "react";

export const initState={
image:'',
productname:'',
description:'',
price:'',
files:'',
sizeS:'',
sizeM:'',
sizeL:'',
size39:'',
size40:'',
size41:'',
size42:'',
catalog:'Chain'
}
type State = typeof initState;
const enum REDUCER_ACTION_TYPE{
    SETIMAGE,
    SETPRODUCTNAME,
    SETDESCRIPTION,
    SETPRICE,
    SETFILES,
    SETSIZES,
    SETSIZEM,
    SETSIZEL,
    SETSIZE39,
    SETSIZE40,
    SETSIZE41,
    SETSIZE42,
    SETCATALOG

}
type ReducerAction = {
    type:REDUCER_ACTION_TYPE
    payload?:any
}
    const setImage=(payload:any)=>{
        return{type:REDUCER_ACTION_TYPE.SETIMAGE,
        payload}
    }
    const setProductname=(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETPRODUCTNAME,
        payload}
    }
    const setDescription=(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETDESCRIPTION,
            payload}
    }
    const setPrice=(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETPRICE,
            payload}
    }
    const setFiles=(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETFILES,
            payload}
    }
    const setSizeS=(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETSIZES,
            payload}
    }
    const setSizeM=(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETSIZEM,
            payload}
    }
    const setSizeL=(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETSIZEL,
            payload}
    }
    const setSize39=(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETSIZE39,
            payload}
    }
    const setSize40=(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETSIZE40,
            payload}
    }
    const setSize41=(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETSIZE41,
            payload}
    }
    const setSize42=(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETSIZE42,
            payload}
    }
    const setCatalog=(payload:any)=>{
        return {type:REDUCER_ACTION_TYPE.SETCATALOG,
            payload}
    }
export const productReducer:Reducer<State,ReducerAction>=(state,action):State=>{
    switch (action.type){
        case REDUCER_ACTION_TYPE.SETIMAGE:
        return {...state,image:action.payload}
        case REDUCER_ACTION_TYPE.SETPRODUCTNAME:
        return {...state,productname:action.payload}
        case REDUCER_ACTION_TYPE.SETDESCRIPTION:
        return {...state,description:action.payload}
        case REDUCER_ACTION_TYPE.SETPRICE:
        return {...state,price:action.payload}
        case REDUCER_ACTION_TYPE.SETFILES:
        return {...state,files:action.payload}
        case REDUCER_ACTION_TYPE.SETSIZES:
        return {...state,sizeS:action.payload}
        case REDUCER_ACTION_TYPE.SETSIZEM:
        return {...state,sizeM:action.payload}
        case REDUCER_ACTION_TYPE.SETSIZEL:
        return {...state,sizeL:action.payload}
        case REDUCER_ACTION_TYPE.SETSIZE39:
        return {...state,size39:action.payload}
        case REDUCER_ACTION_TYPE.SETSIZE40:
        return {...state,size40:action.payload}
        case REDUCER_ACTION_TYPE.SETSIZE41:
        return {...state,size41:action.payload}
        case REDUCER_ACTION_TYPE.SETSIZE42:
        return {...state,size42:action.payload}
        case REDUCER_ACTION_TYPE.SETCATALOG:
        return {...state,catalog:action.payload}
    
        default:
            return state
    }
}
export {setCatalog,setFiles,setImage,setDescription,setPrice,setProductname,setSize39,setSize40,setSize41,setSize42,setSizeL,setSizeM,setSizeS}
