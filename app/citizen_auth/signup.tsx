import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import React from "react";
import { Text, View } from "react-native";

const Index = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [houseId, setHouseId] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [responseString, setResponseString] = React.useState("");
  const [clicked, setClicked] = React.useState(false);

const handleSignUp = async () => {
    const payload = {
    "email": email,
    "password": password,
    "phone_no": phoneNumber,
    "display_name": displayName,
    "house_id": houseId,
    "address": address,
    };
    setClicked(true);
    console.log("Payload being sent:", payload);

    const response = await fetch("https://owm.onrender.com/auth/customer_signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Server error response:", data);
      throw new Error(data?.detail || "Signup failed");
    }

    console.log("Server response:", data);
    setResponseString(data.message || "Signup successful");
};


  return (
    <View>
      <View className="w-full bg-lime-400" style={{ height: 170 }}>
        <Text
          style={{
            fontFamily: "Satoshi",
            fontSize: 60,
            marginLeft: 72,
            marginTop: 35,
          }}
        >
          Sign Up
        </Text>
        <Text
          style={{
            fontFamily: "SatoshiItalic",
            fontSize: 15,
            marginLeft: 72,
            marginTop: 2,
          }}
        >
          using your email address
        </Text>
      </View>

      <Input className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-24 ml-14">
        <InputField
          placeholder="Email"
          style={{ fontFamily: "Satoshi", fontSize: 17 }}
          onChangeText={setEmail}
        />
      </Input>

      <Input className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-4 ml-14">
        <InputField
          placeholder="Password"
          type="password"
          style={{ fontFamily: "Satoshi", fontSize: 17 }}
          onChangeText={setPassword}
        />
      </Input>

      <Input className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-4 ml-14">
        <InputField
          placeholder="Phone Number"
          style={{ fontFamily: "Satoshi", fontSize: 17 }}
          onChangeText={setPhoneNumber}
        />
      </Input>

      <Input className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-4 ml-14">
        <InputField
          placeholder="Display Name"
          style={{ fontFamily: "Satoshi", fontSize: 17 }}
          onChangeText={setDisplayName}
        />
      </Input>

      <Input className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-4 ml-14">
        <InputField
          placeholder="House ID"
          style={{ fontFamily: "Satoshi", fontSize: 17 }}
          onChangeText={setHouseId}
        />
      </Input>

      <Input className="w-80 h-24 bg-white border border-gray-300 rounded-3xl mt-4 ml-14">
        <InputField
          placeholder="Address"
          style={{ fontFamily: "Satoshi", fontSize: 17 }}
          onChangeText={setAddress}
        />
      </Input>

      <Pressable
        className="ml-36 bg-primary-500 h-10 w-36 rounded-full mt-10"
        style={{ backgroundColor: "black" }}
        onPress={handleSignUp}
        disabled={clicked}
      >
        <Text
          style={{
            fontFamily: "Satoshi",
            fontSize: 17,
            marginLeft: 32,
            marginTop: 3,
            color: "white",
          }}
        >
          Sign Up
        </Text>
      </Pressable>

      <Text
        style={{
          fontFamily: "SatoshiItalic",
          fontSize: 18,
          marginLeft: 120,
          marginTop: 6,
        }}
      >
        {responseString}
      </Text>
    </View>
  );
};

export default Index;
