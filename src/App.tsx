import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { Card } from "./components/Card";
import type { Person } from "./types/Person";

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
  const combinedAddress = `${profile.location.street.number} ${profile.location.street.name}, ${profile.location.city}`;

  return (
    <>
      <div className="container">
        <div className="content">
          <div>
            <Card>
              <img src={profile.picture.large} alt="" />
            </Card>
          </div>
          <div>
            <Card>
                <h4>User Name</h4>
                <p>{combinedName}</p>
                <h4>Address</h4>
                <p>{combinedAddress}</p>
                <p>
                  {profile.location.state}, {profile.location.country}{" "}
                  {profile.location.postcode}
                </p>
                <h4>Phone Number</h4>
                <p>{profile.phone}</p>
                <h4>Email</h4>
                <p>{profile.email}</p>
                <h4>Date of Birth</h4>
                {new Date(profile.dob.date).toLocaleDateString()}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
