function HomePage() {
    return(
        <>
        <h1>HomePage</h1>
        <p>{process.env.REACT_APP_BACKEND_URL}</p>
        </>
    )
}

export default HomePage;