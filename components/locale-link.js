import { useRouter } from "next/router";


const LinkComponent = ({href, children}) => {
    const router = useRouter();

    // console.log(router.route.split("/")[2])

    // let path = `/${router.query.lang}/${router.route.split("/")[2]}`

    // console.log(href, path)

    const navigateTo = () => {

        let pathname = window.location.pathname.split("/")

        pathname.shift()
        pathname.shift()

        let newPathname = `${href}/${pathname.join("/")}`

        window.location.href = newPathname
    }

    return (
        // <Link href={`${href}`} scroll={false}>
            <a onClick={() => navigateTo()} className={`/${router.query.lang}` === href ? "active-link" : ""}>{children}</a>
        // </Link>
    )
}

export default LinkComponent