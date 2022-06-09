/* eslint-env jest */

const steps = require('../Etapes')

// A simple example test
describe('#getStepOne() using Promises', () => {
    it('should load step one data', () => {
        return steps.getStepOne()
            .then(data => {
                expect(data).toBeDefined()
                expect(data.entity.title).toEqual('Milan')
            })
    })
})

describe('#getNegativeStep() using Promises', () => {
    it('should throw error when load step', () => {
        return steps.getNegativeStep()
            .then(data => {
                expect(data.entity).toEqual('Requested Group not found')

            })
    })
})

describe('#getAllStep() using Promises', () => {
    it('should load all steps datas', () => {
        return steps.getAllStep()
            .then(data => {
                expect(data).toBeDefined()
            })
    })
})