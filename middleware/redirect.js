export default function({params, route, redirect}) {
  if(route.path == "/schedule")
    redirect(301, "/shows")
}