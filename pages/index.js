import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";
const Banner = ({
  purpose,
  imageUrl,
  desc2,
  title1,
  title2,
  desc1,
  buttonText,
  linkName,
}) => (
  <Flex
    flexWrap="wrap"
    justifyContent="center"
    alignItems="center"
    marginBottom={"10"}
    paddingTop={"10"}
  >
    <Box borderRadius={"20px"} overflow={"hidden"}>
      <Image
        objectFit="cover"
        src={imageUrl}
        width={500}
        height={300}
        alt="banner"
      />
    </Box>

    <Box p={5}>
      <Text color="grey.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1} <br /> {title2}
      </Text>
      <Text
        fontSize="lg"
        paddingTop="3"
        paddingBottom="3"
        color="gray.700"
        fontWeight="medium"
      >
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);
export default function Home({ propertiesForSale, propertiesForRent }) {
  console.log(propertiesForSale, propertiesForRent);

  return (
    <Box w="full" h="full" bg="#E9D8FD" color="#2D3748">
      <Banner
        purpose={"RENT A HOME"}
        title1={"Rental Homes for"}
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2={"and more"}
        buttonText={"Explore Renting"}
        linkName={"/search?purpose-for-rent"}
        imageUrl={
          "https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        }
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {propertiesForRent.map((property) => {
          return <Property property={property} key={property.id} />;
        })}
      </Flex>
      <Banner
        purpose={"BUY A HOME"}
        title1={"Find Buy & Own Your"}
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2={"and more"}
        buttonText={"Explore Renting"}
        linkName={"/search?purpose-for-sale"}
        imageUrl={
          "https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
        }
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {propertiesForSale.map((property) => {
          return <Property property={property} key={property.id} />;
        })}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
