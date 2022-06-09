import { url_prefix } from "../../utils";
import request from "./request";

const getStepOne = step => request(`${url_prefix}/step/${step}`);

const getNegativeStep = step => request(`${url_prefix}/step/${step}`);

const getAllStep = steps => request(`${url_prefix}/step/`);

const getRouteOne = route => request(`${url_prefix}/route/${route}`);

const getStepWithPos = step => request(`${url_prefix}/step/${step}`);

const getStepWithoutInfo = step => request(`${url_prefix}/step/${step}`);

const getMemberUserLogin = member => request(`${url_prefix}/member/${member}`)

const getFictiveMember = member => request(`${url_prefix}/member/${member}`)

const getDocumentFileData = document => request(`${url_prefix}/documents/${document}`)

const getTravelStatus = travel => request(`${url_prefix}/travel/${travel}`)

export {
    getStepOne, getNegativeStep, getAllStep,
    getRouteOne, getStepWithPos, getStepWithoutInfo,
    getMemberUserLogin, getDocumentFileData, getTravelStatus,
    getFictiveMember
}