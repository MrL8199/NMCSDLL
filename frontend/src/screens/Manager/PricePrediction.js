import { useSelector } from "react-redux";
import { useState } from "react";

import { API_PREDICTIONS } from "../../constants";

const PricePrediction = (props) => {
    const auth = useSelector((state) => state.auth);
    const [type, set_type] = useState("linear");
    const [acreage, set_acreage] = useState(14);
    const [bed_type, set_bed_type] = useState(1);
    const [distance_from_center, set_distance_from_center] = useState(150);
    const [is_near_beach, set_is_near_beach] = useState(0);
    const [rank, set_rank] = useState(3.9);
    const [meal, set_meal] = useState(4);
    const [city_id, set_city_id] = useState("2");
    const [property_type_id, set_property_type_id] = useState("7");
    const [price, set_price] = useState(420);

    const predict = async () => {
        try {
            let response = await fetch(`${API_PREDICTIONS}?type=${type}`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + auth.access_token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    acreage: acreage,
                    bed_type: bed_type,
                    distance_from_center: distance_from_center,
                    is_near_beach: is_near_beach,
                    rank: rank,
                    meal: meal,
                    city_id: city_id,
                    property_type_id: property_type_id,
                }),
            });
            if (!response.ok) throw new Error("Error");
            let result = await response.json();
            console.log(result);
            if (!result.status) throw new Error(result.message);
            set_price(result.data);
        } catch (err) {
            console.log(err.toString());
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ marginLeft: 50 }}>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Di???n t??ch</div>
                    <input
                        style={{ paddingLeft: 5 }}
                        value={acreage}
                        onChange={(e) => set_acreage(parseFloat(e.target.value))}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Lo???i gi?????ng</div>
                    <select
                        style={{
                            width: 158,
                            height: 21,
                            paddingLeft: 5,
                        }}
                        value={bed_type}
                        onChange={(event) => set_bed_type(parseInt(event.target.value))}>
                        <option value={0}>Gi?????ng ????n</option>
                        <option value={1}>Gi?????ng ????i</option>
                    </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>C??ch trung t??m</div>
                    <input
                        style={{ paddingLeft: 5 }}
                        value={distance_from_center}
                        onChange={(e) => set_distance_from_center(parseFloat(e.target.value))}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Gi??p bi???n</div>
                    <input
                        type="checkbox"
                        checked={is_near_beach}
                        onChange={(e) => set_is_near_beach(1 - is_near_beach)}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>X???p h???ng</div>
                    <input
                        style={{ paddingLeft: 5 }}
                        value={rank}
                        onChange={(e) => set_rank(parseFloat(e.target.value))}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>B???a ??n</div>
                    <select
                        style={{
                            width: 158,
                            height: 21,
                            paddingLeft: 5,
                        }}
                        value={meal}
                        onChange={(e) => set_meal(parseInt(e.target.value))}>
                        <option value={0}>Kh??ng c??</option>
                        <option value={1}>B???a s??ng</option>
                        <option value={2}>B???a s??ng v?? tr??a</option>
                        <option value={3}>B???a s??ng v?? t???i</option>
                        <option value={4}>C??? ba b???a</option>
                    </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Th??nh ph???</div>
                    <input style={{ paddingLeft: 5 }} value={city_id} onChange={(e) => set_city_id(e.target.value)} />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Lo???i ch??? ngh???</div>
                    <input
                        style={{ paddingLeft: 5 }}
                        value={property_type_id}
                        onChange={(e) => set_property_type_id(e.target.value)}
                    />
                </div>
            </div>
            <div style={{ marginLeft: 50 }}>
                <div style={{ marginBottom: 56 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>S??? d???ng</div>
                    <select
                        style={{
                            width: 158,
                            height: 21,
                            paddingLeft: 10,
                        }}
                        value={type}
                        onChange={(event) => set_type(event.target.value)}>
                        <option value="linear">Linear Regression</option>
                        <option value="neural">Neural Network</option>
                    </select>
                </div>
                <div style={{ marginBottom: 56, textAlign: "center" }}>
                    <div style={{ width: 140, display: "inline-block" }}></div>
                    <button style={{ width: 100 }} onClick={predict}>
                        D??? ??o??n
                    </button>
                </div>
                <div>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>K???t qu???</div>
                    <input value={price} disabled />
                </div>
            </div>
        </div>
    );
};

export default PricePrediction;
