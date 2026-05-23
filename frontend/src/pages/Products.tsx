import { useEffect } from "react";
import { useParams } from "react-router-dom"

export default function Products() {
    const { slug } = useParams();
    console.log(slug)

    useEffect(() => {
        
    }, [slug])

    return (
        <div>Products</div>
    )
}
