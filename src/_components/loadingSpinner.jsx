import React from 'react'
import Loader from 'react-loader-spinner';
const LoadingSpinner = () => {
    return (
        <div
        style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        }}
        >
        <Loader type="ThreeDots" color="#0275d8" height="100" width="100" />
        </div>
    )
}

export  {LoadingSpinner}
