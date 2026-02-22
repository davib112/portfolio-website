import SiteHeader from "@/components/SiteHeader";
import errorStyle from "@/pages/error.module.css"

export default function Custom404() {
   return (
      <div className="Site">
         <div className="background" />
         <SiteHeader />
         <div className={errorStyle.errorParent}>
            <h1>HERE WERE DRAGONS - 404</h1>
            <p>
               The dragons are not around any longer but some other intresting stuff still is, feel free to check out some of my other pages. <a href="/pong">Maybe play some pong</a> or <a href="/">go back to safe waters.</a>
            </p>
         </div>
      </div>
   );
}