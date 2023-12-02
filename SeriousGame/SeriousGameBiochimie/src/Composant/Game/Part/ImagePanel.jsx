/* eslint-disable react/prop-types */
import img_arrow from "../../Global/fleche_jeu.png"
export default function ImagePanel({ShowImage}) {

    //state

    //function

    //render
    return (
        <div onClick={ShowImage}>
            <img src={img_arrow} style={{
                width : '6%'
            }}>
            
            </img>
        </div>
    )
}
