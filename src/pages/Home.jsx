import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs'

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';

import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

const Home = () => {

    const{searchValue} = React.useContext(SearchContext)

    const navigate = useNavigate()
    const categoryId = useSelector((state) => state.filter.categoryId)
    const sortType = useSelector((state) => state.filter.sort.sortProperty)
    const currentPage = useSelector((state) => state.filter.currentPage)
    
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    const dispatch = useDispatch()

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const fetchPizzas = () => {
        setIsLoading(true)

        const search = searchValue ? `search=${searchValue}` : '';

    axios.get(`https://66276eb9b625bf088c08533c.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}`: ''}${search}&sortBy=${sortType}&order=desc`)
    .then(res => {
        setItems(res.data)
        setIsLoading(false)
        })
    }

    React.useEffect(() => {
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = list.find((obj) => obj.sortProperty === params.sortProperty)

            dispatch(setFilters({
                ...params,
                sort,
            }))
            isSearch.current = true
        }
    },[])


    useEffect(() => {
        window.scrollTo(0, 0)
        if(!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false
    },[categoryId, sortType, searchValue, currentPage])

    React.useEffect(() => {
        if(isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType,
                categoryId,
                currentPage
            }) 
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    },[categoryId, sortType, searchValue, currentPage])
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
            <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory} />
            <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{isLoading? skeletons : pizzas}</div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home