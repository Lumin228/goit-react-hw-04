import css from '../Loader/Loader.module.css'
import { FadeLoader } from 'react-spinners'


export const Loader = () => {

    return (
        <FadeLoader
        className={css.loader}
        color="#0038ff"
        height={17}
        radius={20}
        width={4}
        />
    )
}