import React, { useState } from "react";
import { ChakraProvider, Box, Flex, Text, Button, IconButton, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, useDisclosure, VStack, FormControl, FormLabel, Heading, theme } from "@chakra-ui/react";
import { FaBars, FaUserCircle } from "react-icons/fa";

const Index = () => {
  const [canvasText, setCanvasText] = useState("Your text here...");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("lightgreen");
  const [fontSize, setFontSize] = useState("20");
  const [activeStep, setActiveStep] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: "100%", height: "500px" });
  const maxSteps = 4;

  const nextStep = () => setActiveStep((prev) => (prev < maxSteps ? prev + 1 : prev));
  const prevStep = () => setActiveStep((prev) => (prev > 1 ? prev - 1 : prev));
  const { isOpen: isLeftOpen, onOpen: onLeftOpen, onClose: onLeftClose } = useDisclosure();
  const { isOpen: isRightOpen, onOpen: onRightOpen, onClose: onRightClose } = useDisclosure();

  const handleTextChange = (e) => setCanvasText(e.target.value);
  const handleFontSizeChange = (e) => setFontSize(e.target.value);

  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" minH="100vh">
        {/* Navbar */}
        <Flex as="nav" justifyContent="space-between" alignItems="center" p={4} borderBottomWidth="1px">
          <IconButton variant="ghost" aria-label="Open login drawer" icon={<FaUserCircle />} onClick={onRightOpen} />
          <Text fontSize="xl" fontWeight="bold">
            Worksheet Generator
          </Text>
          <IconButton variant="ghost" aria-label="Open menu drawer" icon={<FaBars />} onClick={onLeftOpen} />
        </Flex>

        {/* Main content */}
        <Flex overflow="hidden">
          {/* Canvas area */}
          <Box flex="2" p={4}>
            <Box style={{ width: "100%", height: "500px", overflow: "hidden", borderRadius: "16px", boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)" }}>
              <Box style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundColor: backgroundColor, width: canvasSize.width, height: canvasSize.height, margin: "0 auto", borderRadius: "inherit", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)" }}>
                <Text fontSize={`${fontSize}px`}>{canvasText}</Text>
              </Box>
            </Box>
          </Box>

          {/* Sidebar */}
          <Box flex="1" bg="gray.100" p={4}>
            <Box flex="1" bg="gray.100" p={4}>
              <VStack spacing={4} h="80%">
                {activeStep === 1 && (
                  <VStack spacing={4}>
                    <Heading as="h3" size="lg">
                      Step 1: Customize Text
                    </Heading>
                    <Text as="p">Set your desired text and font size for the canvas.</Text>
                    <FormControl>
                      <FormLabel htmlFor="fontSize">Font Size</FormLabel>
                      <Input id="fontSize" type="number" value={fontSize} onChange={handleFontSizeChange} />
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="canvasText">Text</FormLabel>
                      <Input id="canvasText" value={canvasText} onChange={handleTextChange} />
                    </FormControl>

                    <Button colorScheme="blackAlpha" onClick={() => {}} mt={4}>
                      Apply Changes
                    </Button>
                  </VStack>
                )}
                {activeStep === 2 && (
                  <VStack spacing={4}>
                    <Heading as="h3" size="lg">
                      Step 2: Background
                    </Heading>
                    <Text as="p">Choose a background image or color for your canvas.</Text>
                    <FormControl>
                      <FormLabel htmlFor="backgroundImage">Background Image Link</FormLabel>
                      <Input id="backgroundImage" placeholder="Enter image URL" value={backgroundImage} onChange={(e) => setBackgroundImage(e.target.value)} />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="backgroundColor">Background Color</FormLabel>
                      <Input id="backgroundColor" placeholder="Enter color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                    </FormControl>
                    <Button colorScheme="blackAlpha" onClick={() => {}} mt={4}>
                      Apply Background
                    </Button>
                  </VStack>
                )}
                {activeStep === 3 && (
                  <VStack spacing={4}>
                    <Heading as="h3" size="lg">
                      Step 3: Canvas Size
                    </Heading>
                    <Text as="p">Select a pre-defined canvas size that fits your needs.</Text>
                    <Button onClick={() => setCanvasSize({ width: "4in", height: "6in" })}>4x6</Button>
                    <Button onClick={() => setCanvasSize({ width: "5in", height: "7in" })}>5x7</Button>
                    <Button onClick={() => setCanvasSize({ width: "8in", height: "10in" })}>8x10</Button>
                    <Button onClick={() => setCanvasSize({ width: "8.3in", height: "11.7in" })}>A4</Button>
                  </VStack>
                )}
                {activeStep === 4 && (
                  <VStack spacing={4}>
                    <Heading as="h3" size="lg">
                      Step 4: Review
                    </Heading>
                    <Text as="p">Review your changes and make any final adjustments before saving.</Text>
                  </VStack>
                )}
              </VStack>
              <Flex h="20%" alignItems="center" justifyContent="space-between" p={4} borderTopWidth="1px">
                <Button onClick={prevStep}>Previous</Button>
                <Button onClick={nextStep}>Next</Button>
              </Flex>
            </Box>
          </Box>
        </Flex>

        {/* Left Drawer Menu */}
        <Drawer placement="left" onClose={onLeftClose} isOpen={isLeftOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>{/* Menu content goes here */}</DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Right Drawer Login */}
        <Drawer placement="right" onClose={onRightClose} isOpen={isRightOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Login</DrawerHeader>
            <DrawerBody>
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" placeholder="Enter your username" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" placeholder="Enter your password" type="password" />
              </FormControl>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onRightClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Login</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
