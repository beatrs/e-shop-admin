import "./Widget.scss"
import { FormatNumber } from "../../services/general"

const Widget = ({title, icon, value, valueIcon, etcLbl, bdColor}) => {
    return (
        <div className="widget" style={{borderLeft: `4px solid ${bdColor}`}}>
            <div className="left">
                <span className="title" style={{color: bdColor}}>{title}</span>
                <div className="value">
                    {valueIcon}
                    {FormatNumber.withComma(value)}
                </div>
                {etcLbl &&
                <span className="lbl">View all</span>
                }
            </div>
            <div className="right">
                <div className="widget--icon">
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default Widget