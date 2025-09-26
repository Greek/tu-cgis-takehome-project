import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { Card } from "./components/Card";
import type { Person } from "./types/Person";
import { Navbar } from "./components/Navbar";

function App() {
  const { data, error, refetch, isRefetching, isLoading, isSuccess } =
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
  const combinedAddress = `${profile.location.street.number} ${profile.location.street.name}, ${profile.location.city},`;

  const fields = [
    {
      title: "User Name",
      value: combinedName,
    },
    {
      title: "Address",
      value: combinedAddress + `\n${profile.location.state}, \n
                 ${profile.location.country} ${profile.location.postcode}`
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
      <Navbar userName={combinedName} />
      <div className="container">
        <div className="content">
          <div>
            <Card>
              <img src={profile.picture.large} alt="" />
            </Card>
          </div>
          <div>
            <Card>
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
