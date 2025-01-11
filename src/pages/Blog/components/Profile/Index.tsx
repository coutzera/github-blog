import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExternalLink } from "../../../../components/ExternalLink";
import { faBuilding, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { ProfileContainer, ProfilePicture, ProfileDetails } from "./styles";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../../lib/axios";
import { Spinner } from "../../../../components/Spinner";

const username = import.meta.env.VITE_GITHUB_USERNAME;

interface ProfileData {
  login: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company?: string;
  followers: number;
}

export function Profile() {
  const [profileData, setProfileData] = useState<ProfileData>(
    {} as ProfileData
  );
  const [isLoading, setIsLoading] = useState(true);

  const getProfileData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/users/${username}`);
      setProfileData(response.data);
    } finally {
      setIsLoading(false);
    }
  }, []); // Adicionado array vazio, pois não há necessidade de dependência em profileData

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <ProfileContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ProfilePicture
            src={profileData.avatar_url}
            alt={profileData.login}
          />

          <ProfileDetails>
            <header>
              <h1>{profileData.name}</h1>
              <ExternalLink text="Github" href={profileData.html_url} />
            </header>
            <p>{profileData.bio || "Sem bio disponível"}</p>
            <ul>
              <li>
                <FontAwesomeIcon icon={faGithub} />
                {profileData.login}
              </li>
              <li>
                <FontAwesomeIcon icon={faBuilding} />
                {profileData.company || "Empresa não especificada"}
              </li>
              <li>
                <FontAwesomeIcon icon={faUserGroup} />
                {profileData.followers} seguidores
              </li>
            </ul>
          </ProfileDetails>
        </>
      )}
    </ProfileContainer>
  );
}
