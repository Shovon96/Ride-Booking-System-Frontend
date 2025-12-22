import { Link } from "react-router";

export default function Logo() {
    return (
        <div>
            <Link to="/">
                <img
                    className="h-18"
                    src={"https://i.ibb.co.com/8D711zhX/cholo-Ride-main-logo.png"}
                    alt="Logo"
                />
            </Link>
        </div>
    )
}