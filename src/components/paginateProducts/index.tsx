
import React, { useEffect, useState, } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useAppSelector } from '../../app/hooks';
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import Loading from "../loading";

const PaginateProducts: React.FC = () => {

    const verifyToken = useAppSelector(state => state.auth.verifyToken);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [products, setProducts] = useState<any[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1);
    const handlePageClick = (event: any) => {
        setSearchParams({ page: event.selected + 1 }, { replace: true })
        setCurrentPage(event.selected + 1)
    };
    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                axios.interceptors.request.use(
                    (config: AxiosRequestConfig<any>) => {
                        (config as any).headers.authorization = `Bearer ${verifyToken}`;
                        return config;
                    }, error => Promise.reject(error)
                )
                const response = await axios.get(`https://dummyjson.com/auth/products?limit=${20}&skip=${(Number(currentPage) - 1) * 20}`);
                setLoading(false);
                setPageCount(5)
                //console.log(response);
                setProducts(response.data.products)
            } catch (error) {
                setLoading(false);
                setPageCount(1)
                console.log(error)
            }
        }
        if (verifyToken) getProducts();
    }, [currentPage])

    return (
        <>
            {
                !verifyToken ? <div className="m-2 p-1 text-center">برای مشاهده اطلاعات جداول محصولات باید ابتدا وارد سایت شوید</div>
                    :
                    <>
                        {loading ? <Loading /> :
                            <>
                                <div className=" p-3 h-[400px] overflow-auto" dir="ltr">
                                    <table className="w-full">
                                        <thead>
                                            <tr className=" bg-indigo-300 p-2">
                                                <td>id</td><td>title</td><td>price</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((item: any) => (
                                                <tr key={item.id}><td>{item.id}</td><td>{item.title}</td><td>{item.price}</td></tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>
                                <div className="my-10 flex justify-center">
                                    <ReactPaginate
                                        className="flex"
                                        nextLabel="بعدی >"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        pageCount={Number(pageCount)}
                                        previousLabel="< قبلی"
                                        pageClassName="inline "
                                        initialPage={Number(currentPage) - 1}
                                        previousClassName="inline"
                                        nextClassName="inline"
                                        pageLinkClassName="px-2 mx-1 bg-gray-300 hover:bg-gray-400 hover:text-white active:bg-gray-500 rounded-sm transition"
                                        activeLinkClassName="bg-purple-600 hover:bg-purple-700 hover:text-white active:bg-purple-800 transition"
                                    />
                                </div>
                            </>
                        }
                    </>

            }
        </>
    )
}

export default PaginateProducts;