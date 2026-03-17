import { useNavigate } from "react-router-dom"
import { regions } from "../data/products"

export default function RegionSelect() {

const navigate = useNavigate()

function selectRegion(id:string){
localStorage.setItem("region",id)
navigate("/dashboard")
}

return(

<div style={{padding:40}}>

<h1>Bölge Seç</h1>

{regions.map(r=>(
<button
key={r.id}
onClick={()=>selectRegion(r.id)}
style={{
display:"block",
margin:"10px",
padding:"20px",
fontSize:"18px"
}}
>
{r.name}
</button>
))}

</div>

)

}
