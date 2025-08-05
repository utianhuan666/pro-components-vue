import type {} from '../../typing'
import {useBreakpoints} from '@vueuse/core'

const breakpoints = useBreakpoints({
    xs:480,
    sm:576,
    md:769,
    lg:992,
    xl:1200,
    xxl:1600
})

const bpOrder = BreakPoint[]=['xxl','xl','lg','md','sm','xs']

export function useCardLayout(){
    const screens = breakpoints

    const resolveResponsive = (val)=>{
        if(typeof val!=='object') return val
        for(const bp of bpOrder){
            if(screens[bp].value && val[bp] !== void 0) return val[bp]!
        }
        return val
    }
}