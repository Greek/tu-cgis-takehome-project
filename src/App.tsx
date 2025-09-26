import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { Card } from "./components/card";
import type { Person } from "./types/Person";
import { Navbar } from "./components/Navbar";

function App() {
  const { data, error, refetch, isLoading } =
    useQuery<{ results: Person[] }>({
      queryKey: ["profileData"],
      queryFn: () =>
        fetch("https://randomuser.me/api/").then((res) => res.json()),
    });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data)
    return <p>An error occurred, try getting profile again?</p>;

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
            <Card centered>
                <img className="rounded" src={profile.picture.large} width={200} height={200} alt="" />
            </Card>
            <button onClick={() => refetch()}>Fetch New User</button>
          </div>
          <div>
            <Card width="fixed">
              {fields.map((field) => (
                <span key={field.title} >
                  <h4>{field.title}</h4>
                  <p>{field.value}</p>
                </span>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
