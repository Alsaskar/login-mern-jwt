import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    useMemo,
    useReducer
} from 'react'
import { generatePath, useHistory, useParams } from 'react-router-dom'

export const RootContext = createContext(null)

const navigationReducer = (state, action) => {
    var ret = {...state}

    if(!ret[action.base]){
        ret[action.base] = []
    }

    return{
        ...ret,
        [action.base]: action.data
    }
}

export const RootProvider = ({children}) => {
    const history = useHistory()
    const [items, dispatchItems] = useReducer(navigationReducer, {})
    const currentNav = null;

    const navGoTo = useCallback((path) => {
        history.push(path)
    }, [history])

    const nav = {
        path: items,
        current: currentNav,
        go: navGoTo
    }

    const __internal = {
        dispatchNavigation: dispatchItems
    }

    return(
        <RootContext.Provider value={{
            navigation: nav,
            __internal: __internal
        }}>
            {children}
        </RootContext.Provider>
    )
}

export const useRoot = () => {
    const root = useContext(RootContext)
    return root;
}

export const Navigation = ({base, navigation, children}) => {
    const root = useRoot()
    const params = useParams()
    const { __internal } = root

    useEffect(() => {
        __internal.dispatchNavigation({
            base: base,
            data: navigation,
            params
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return children
}

export const useNav = (base) => {
    const {navigation} = useContext(RootContext)
    const [breadcumb] = useState([])
    const params = useParams()

    const items = useMemo(() => {
        var its = navigation.path[base] || []
        
        its = its.map((item) => {
            if(!item.rendered) item.rendered = item.path
            if(item.path.indexOf(base) === 0) return item
            let path = base;

            if(base.slice(-1) !== '/') path = path.concat('/')

            item.path = item.path.replace('/', path)
            try{
                item.rendered = generatePath(item.path, params)
            }catch(err){
                console.log(err)
            }

            return item
        })

        return its || null;
    }, [navigation.path, base, params])

    const push = useCallback((path) => {
        console.log(path)
    }, [])

    const go = useCallback((path) => {
        var goToPath = null

        for(let item of items){
            if(item['path'] === path){
                goToPath = item['rendered']
            }
        }

        if(goToPath === null) return;
        navigation.go(goToPath)
    }, [navigation, items])

    return {
        breadcumb: breadcumb,
        items: items,
        go: go,
        push: push
    }
}