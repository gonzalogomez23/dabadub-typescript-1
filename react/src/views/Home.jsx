import PrimaryButton from "components/PrimaryButton";

const Home = () => {
  return (
        <div className="w-full max-w-6xl mx-auto px-3 py-6">
            <h1 className="text-4xl text-primary font-semibold font-headings px-2 mb-6">Home</h1>
            <PrimaryButton to="/posts">
              Go to posts
            </PrimaryButton>
        </div>
  )
}

export default Home
