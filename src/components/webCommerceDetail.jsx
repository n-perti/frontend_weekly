import { useEffect, useState } from "react";

export default function commerceDetail({commercejson}) {
    const [commerce, setCommerce] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/webcommerces/" + commercejson)
            .then((response) => response.json())
            .then((data) => setCommerce(data));
    }
    , []);
    
    return (
        <div>
            <h1>Commerce Detail</h1>
            <ul>
                <h3 key={commerce._id}>{commerce.title} – {commerce.city} – {commerce.activity}</h3>
            </ul>
        </div>
    );

}
