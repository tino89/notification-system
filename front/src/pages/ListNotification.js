import { useEffect, useState } from "react";


export default function ListNotification() {

    const [data, setData] = useState([]);

    function getAllNotification() {
        fetch('http://localhost:3001/v1/notification', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert("cannot load data");
            }
        }).then(async (data) => {
            setData(data);

        })
        .catch((err) => {
            alert("cannot load data");
            console.log(err.message);
        });

    }

    useEffect(() => {
        getAllNotification();
    }, []);


    return (<><div className="row pt-4">

        <div className="col-9 offset-1">
            <table className="table table-striped ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Channel</th>
                        <th scope="col">Message</th>
                        <th scope="col">User</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.categoryName}</td>
                            <td>{item.channelName}</td>
                            <td>{item.message}</td>
                            <td>{item['user.name']}</td>
                            <td>{item['user.email']}</td>
                            <td>{item.createdAt}</td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
    </div></>);
}