/* eslint-env jest */

const tests = require('../Requests/travelRequest')

// A simple example test
describe('#getStepOne() using Promises', () => {
    it('should load step one data', () => {
        return tests.getStepOne(2)
            .then(data => {
                expect(data).toBeDefined()
                expect(data.entity.title).toEqual('Milan')
            })
    })
})

describe('#getNegativeStep() using Promises', () => {
    it('should throw error when load step', () => {
        return tests.getNegativeStep(-1)
            .then(data => {
                expect(data.entity).toEqual('Requested Group not found')

            })
    })
})

describe('#getAllStep() using Promises', () => {
    it('should load all steps datas', () => {
        return tests.getAllStep()
            .then(data => {
                expect(data).toBeDefined()
            })
    })
})

describe('#getRouteOne() using Promises', () => {
    it('should check if a route is between two step', () => {
        return tests.getRouteOne(1)
            .then(data => {
                expect(data).toBeDefined()
                expect(data.entity.start).toBeDefined()
                expect(data.entity.finish).toBeDefined()
            })
    })
})

// a changer selon point
const latitude = 45.50350965969653;
const longitude = 9.147270990821355;

describe('#getStepWithPos() using Promises', () => {
    it('should check if a step has position', () => {
        return tests.getStepWithPos(2)
            .then(data => {
                expect(data).toBeDefined()
                expect(data.entity.latitude).toEqual(latitude)
                expect(data.entity.longitude).toEqual(longitude)
            })
    })
})


describe('#getStepWithoutInfo() using Promises', () => {
    it('should check if a step has not info but his template', () => {
        return tests.getStepWithoutInfo(1)
            .then(data => {
                expect(data).toBeDefined()
                expect(data.entity.description).toEqual('{"blocks":[{"key":"1j7kh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}')

            })
    })
})

describe('#getMemberUserLogin() using Promises', () => {
    it('should check if member has UserLogin', () => {
        return tests.getMemberUserLogin(1)
            .then(data => {
                expect(data).toBeDefined()
                expect(data.entity.userLogin).toBeDefined()

            })
    })
})

describe('#getFictiveMember() using Promises', () => {
    it('should check if member is fictive', () => {
        return tests.getMemberUserLogin(3)
            .then(data => {
                expect(data).toBeDefined()
                expect(data.entity.userLogin).toEqual(null)
                expect(data.entity.UserId).toEqual(null)
            })
    })
})

describe('#getDocumentFileData() using Promises', () => {
    it('should check if document has file data', () => {
        return tests.getDocumentFileData(1)
            .then(data => {
                expect(data).toBeDefined()
                expect(data.entity.dataFile).toBeDefined()
            })
    })
})

describe('#getTravelStatus() using Promises', () => {
    it('should check if travel has status 0', () => {
        return tests.getTravelStatus(1)
            .then(data => {
                expect(data).toBeDefined()
                expect(data.entity.status).toEqual(1)
            })
    })
})

describe('#getTravelStatus() using Promises', () => {
    it('should check if travel has status 1 ', () => {
        return tests.getTravelStatus(2)
            .then(data => {
                expect(data).toBeDefined()
                expect(data.entity.status).toEqual(0)
            })
    })
})

