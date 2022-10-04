
import React, { useEffect, useMemo, useState, } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useAppSelector } from '../../app/hooks';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Loading from "../loading";

const Products: React.FC = () => {

    const verifyToken = useAppSelector(state => state.auth.verifyToken);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const columnDefs = [
        { field: 'id' },
        { field: 'title' },
        { field: 'price' }
    ]

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        floatingFilter: true,
    }), []);

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
                const response = await axios.get("https://dummyjson.com/auth/products");
                setLoading(false);
                //console.log(response);
                setProducts(response.data.products)
            } catch (error) {
                setLoading(false);
                console.log(error)
            }
        }
        if (verifyToken) getProducts();
    }, [])


    return (
        <>
            {
                !verifyToken ? <div className="m-2 p-1 text-center">برای مشاهده اطلاعات جداول محصولات باید ابتدا وارد سایت شوید</div>
                    :
                    <>
                        {
                            loading ? <Loading /> :
                                <div dir='rtl' className="h-[400px] p-3 overflow-auto w-full" >
                                    <AgGridReact className="ag-theme-alpine"
                                        rowData={products}
                                        columnDefs={columnDefs}
                                        rowSelection="multiple"
                                        defaultColDef={defaultColDef}
                                        animateRows={true}
                                    />

                                </div>

                        }
                    </>
            }
        </>
    )
}

export default Products;