import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3000/all-jobs").then(res => res.json()).then(data => {

            setJobs(data);
            setIsLoading(false);
        })
    
    }, [])

    console.log(jobs)

    //handle input change
    const [query, setQuery] = useState("");
    const handleInputChange = (event) => {
        setQuery(event.target.value)
    }

    //filter jobs by title
    const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    
    //radio button filter
    const handleChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    //button filter
    const handleClick = (event) => {
        setSelectedCategory(event.target.value)
    }

    //calculate the page index
    const calculatePageRange = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return {startIndex, endIndex};
    }

    //function for next page
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)){
            setCurrentPage(currentPage + 1);
        }
    }

    //function for previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    //main function
    const filteredData = (jobs, selected, query) => {
        let filteredJobs = jobs;
        if (query) {
            filteredJobs = filteredItems;
        }
        //category filtering
        if (selected) {
            filteredJobs = filteredJobs.filter(({jobLocation, maxPrice, experienceLevel, salaryType, 
            employmentType, postingDate}) => (
                jobLocation.toLowerCase() === selected.toLowerCase() ||
                parseInt(maxPrice) <= parseInt(selected) ||
                experienceLevel.toLowerCase() >= selected.toLowerCase() ||
                salaryType.toLowerCase() === selected.toLowerCase() ||
                employmentType.toLowerCase() === selected.toLowerCase() ||
                postingDate >= selected
            ));
            console.log(filteredJobs)
        }

        //slice the data based on current page
        const {startIndex, endIndex} = calculatePageRange();
        filteredJobs = filteredJobs.slice(startIndex, endIndex)

        return filteredJobs.map((data, i) => <Card key={i} data={data} />)
    }

    const result = filteredData(jobs, selectedCategory, query);

    return (
        <div>
            <Banner query = {query} handleInputChange = {handleInputChange}/>

            {/* main content */}
            <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
                {/* left side */}
                <div className="bg-white p-4 rounded">
                    <Sidebar handleChange={handleChange} handleClick={handleClick}/>
                </div>
                {/* job cards */}
                <div className="col-span-2 bg-white p-4 rounded-sm">
                    {
                        isLoading ? (<p className="font-medium">Loading...</p>) : result.length > 0 ? (<Jobs result={result}/>) : <>
                        <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
                        <p>No data found!</p>
                        </>
                    }

                    {/* pagination here */}

                    {
                        result.length > 0 ? (
                            <div className="flex justify-center mt-4 space-x-8">
                                <button className="hover:underline" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                                <span className="mx-2">Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                                <button className="hover:underline" onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}>Next</button>
                            </div>
                        ) : ""
                    }
                    
                </div>
                {/* right side */}
                <div className="bg-white p-4 rounded"><Newsletter/></div>

            </div>

            
        </div>
    )
}

export default Home