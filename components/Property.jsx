import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text, WrapItem } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

const house = require("../assets/house.jpeg");

import React from "react";

function Property({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) {
  return (
    <Link href={`/property/${externalID}`} passHref>
      <Flex
        flexWrap="wrap"
        w="420px"
        p="5"
        paddingTop="0"
        alignItems="center"
        justifyContent="flex-start"
        cursor="pointer"
      >
        <Box borderRadius={"20px"} overflow={"hidden"}>
          <Image
            objectFit="cover"
            src={coverPhoto ? coverPhoto.url : house}
            width={500}
            height={300}
            alt="house"
          />
        </Box>
        <Box w="full">
          <Flex
            paddingTop="2"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex alignItems="center">
              <Box paddingRight="3" color="green.400">
                {isVerified && <GoVerified />}
              </Box>
              <Text fontWeight="bold" fontSize="large">
                AED {millify(price)}
                {rentFrequency && `/${rentFrequency}`}
              </Text>
            </Flex>
            <Box>
              <Avatar size="sm" src={agency?.logo?.url}></Avatar>
            </Box>
          </Flex>
          <Flex
            alignItems="center"
            p="1"
            justifyContent="space-between"
            w="250px"
            color="gray.700"
          >
            {rooms}
            <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft.{" "}
            <BsGridFill />
          </Flex>
          <Text fontSize="lg">
            {title.length > 30 ? title.substring(0, 30) + "..." : title}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
}

export default Property;
