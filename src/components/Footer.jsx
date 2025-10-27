import {pageLinks, externalLinks} from '../links'

function FooterNav({ allLinks, currentLangue }) {
  const [title, ...links] = allLinks

  const linkComponents = links.map((link, i) => {
    return <a
      key={`${i}_link`}
      href={link.url}
      className="link link-hover"
    >{link.name[currentLangue]}</a>
  })

  // `template string ${title}`, python vastine: f""" sndkfjnskdjnf $jokudata """

  return <nav>
    <h6 className="footer-title">{title}</h6>
    {linkComponents}
  </nav>
}

export default function Footer({currentLangue}) {

  return <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
    <FooterNav currentLangue={currentLangue} allLinks={pageLinks}></FooterNav>
    <FooterNav currentLangue={currentLangue} allLinks={externalLinks}></FooterNav>
  </footer>
}