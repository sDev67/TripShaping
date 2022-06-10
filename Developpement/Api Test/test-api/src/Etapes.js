import request from './request'

const url_prefix = "http://cdad181.iutrs.unistra.fr:4200";
// const url_prefix = "http://localhost:3000/";

const travel_id = 1;

const getStepOne = step => request(`${url_prefix}/step/1`);

const getNegativeStep = step => request(`${url_prefix}/step/-1`);

const getAllStep = steps => request(`${url_prefix}/step/`);

export { getStepOne, getNegativeStep, getAllStep }