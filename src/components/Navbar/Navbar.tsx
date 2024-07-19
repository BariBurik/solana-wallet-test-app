import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.scss";

function Navbar() {
    return (
        <div className={styles.navbar}>
            <Link
                className={styles.link}
                href={'/'}>
                <Image alt="Главная" src={"/home.svg"} width={80} height={80} />
            </Link>
            <Link
                className={styles.link}
                href={'/wallet'}>
                <Image alt="Кошелёк" src={"/coin.svg"} width={80} height={80} />
            </Link>
            <Link
                className={styles.link}
                href={'/transaction'}>
                <div style={{ transform: 'rotate(90deg)' }}>
                    <Image alt="Транзакции" src="/trans.svg" width={80} height={80} />
                </div>
            </Link>
        </div> 
    );
}

export default Navbar;