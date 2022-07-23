import styled from "styled-components";
import ChooseTypeUser from "../../components/ChooseTypeUser/ChooseTypeUser.component";
import { HomePageContainer } from "./Home.page.styles";


const HomePage = () => {


  return(
    <HomePageContainer className='centered'>
      <ChooseTypeUser></ChooseTypeUser>
    </HomePageContainer>
  )
};

export default HomePage;