import * as React from 'react'
import { Link } from 'gatsby'
import {
    container,
    heading,
    navLinks,
    navLinkItem,
    navLinkText
} from './layout.module.css'
import 'katex/dist/katex.min.css';

const Layout = ({ pageTitle, children }) => {
    return (
        <div className={container}>
            <nav>
                <ul className={navLinks}>
                    <li className={navLinkItem}>
                        <Link to="/" className={navLinkText}>
                            Home
                        </Link>
                    </li>
                    <li className={navLinkItem}>
                        <Link to="/notes" className={navLinkText}>
                            Notes
                        </Link>
                    </li>
                    <li className={navLinkItem}>
                        <Link to="/paper" className={navLinkText}>
                            Paper
                        </Link>
                    </li>
                    <li className={navLinkItem}>
                        <Link to="/art" className={navLinkText}>
                            Art
                        </Link>
                    </li>
                </ul>
            </nav>
            <main>
                <h1 className={heading}>{pageTitle}</h1>
                {children}
            </main>
        </div>
    )
}

export default Layout