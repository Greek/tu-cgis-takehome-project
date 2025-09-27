import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { Card } from "./components/card";
import type { Person } from "./types/Person";
import { Navbar } from "./components/navbar";
import { useEffect, useState } from "react";

function App() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { data, error, refetch, isLoading, isRefetching } =
    useQuery<{ results: Person[] }>({
      queryKey: ["profileData"],
      queryFn: () =>
        fetch("https://randomuser.me/api/").then((res) => res.json()),
      refetchOnWindowFocus: false,
    });

  // add listener for changes in screen width to DOM
  useEffect(() => {
    const mobileState = window.matchMedia("(max-width: 640px)");
    const handleChange = (ev: MediaQueryListEvent) => setIsMobile(ev.matches)
    setIsMobile(mobileState.matches);
    
    mobileState.addEventListener('change', handleChange);
    return () => mobileState.removeEventListener('change', handleChange);
  }, [])

  if (isLoading) return ( <><Navbar /><div className="container"><h2>Loading...</h2></div></>);
  if (error || !data)
    return (<><Navbar /><div className="container"><h2>An error occurred, try getting profile again?</h2></div></>);

  // grab the first profile from the list
  const profile = data.results[0];
  const combinedName = `${profile.name.first} ${profile.name.last}`;
  const combinedAddress = `${profile.location.street.number} ${profile.location.street.name}, ${profile.location.city}, ${profile.location.state} ${profile.location.postcode}`;

  const fields = [
    {
      title: "User Name",
      value: combinedName,
    },
    {
      title: "Address",
      value: combinedAddress
    },
    {
      title: "Phone Number",
      value: profile.phone,
    },
    {
      title: "Email",
      value: profile.email
    },
    {
      title: "Date of Birth",
      value: new Date(profile.dob.date).toLocaleDateString(),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="content">
          <div className="picture-display">
            <img className="picture" src={profile.picture.large} width={240} height={240} alt="" />
            {!isMobile && <button className="btn-refetch" disabled={isRefetching} onClick={() => refetch()}>Fetch New User</button>}
          </div>
          <div className="bio">
            <Card width="fixed">
              {fields.map((field) => (
                <span key={field.title} >
                  <h4>{field.title}</h4>
                  <p>{field.value}</p>
                </span>
              ))}
            </Card>
          </div>
          {isMobile && <button className="btn-refetch mobile" disabled={isRefetching} onClick={() => refetch()}>Fetch New User</button>}
        </div>
      </div>
    </>
  );
}

export default App;
