import React, { useEffect, useState } from "react";

const Hamkorlar = () => {
    const [data, setData] = useState([])
    const[url, setUrl] = useState('')
    useEffect(() => {
        fetch('http://localhost:5000/Hamkorlar/')
            .then(res => res.json())
            .then(data => setData(data))
    }, [])

    console.log(data);

    return (
        <>
            <div className=" flex justify-between h-[100vh] items-center">
                {
                    data.map((v) => (
                        <img className=" w-[180px] h-[87px]" src={v.url} alt="" />
                    ))
                }
            </div>
        </>
    )
}

export default Hamkorlar;