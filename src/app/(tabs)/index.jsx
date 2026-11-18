import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import EmptyState from "../../components/EmptyState";
import OutingCard from "../../components/OutingCard";
import OutingFilters from "../../components/OutingFilters";
import SearchBar from "../../components/SearchBar";
import { colors, sizes } from "../../constants/colors";
import { outingStatuses, outingTypes } from "../../constants/outingOptions";
import { useOutings } from "../../context/OutingsContext";

export default function HomeScreen() {
  const { outings, isLoaded, error } = useOutings();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // The visible list is calculated from the state on every render, so it is never out of date.
  const searchText = search.trim().toLowerCase();
  const visibleOutings = outings.filter((outing) => {
    const matchesSearch = outing.title.toLowerCase().includes(searchText);
    const matchesStatus = statusFilter === "All" || outing.status === statusFilter;
    const matchesType = typeFilter === "All" || outing.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  function openNewOuting() {
    router.push("/outing/form");
  }

  function openOutingDetails(outing) {
    router.push({ pathname: "/outing/[id]", params: { id: outing.id } });
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
  }

  // Only show the spinner while the saved outings are actually being loaded.
  if (!isLoaded) {
    return (
      <AppScreen centered>
        <ActivityIndicator size="large" color={colors.primary} />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <AppButton text="New outing" onPress={openNewOuting} style={styles.newButton} />

      <SearchBar value={search} onChangeText={setSearch} />

      <Text style={styles.label}>Status</Text>
      <OutingFilters options={["All", ...outingStatuses]} selected={statusFilter} onChange={setStatusFilter} />

      <Text style={styles.label}>Type</Text>
      <OutingFilters options={["All", ...outingTypes]} selected={typeFilter} onChange={setTypeFilter} />

      <View style={styles.listSpacer} />

      {outings.length === 0 ? (
        <EmptyState
          title="No outings yet"
          message="Pitch the first idea to your friends."
          actionText="Pitch an outing"
          onAction={openNewOuting}
        />
      ) : visibleOutings.length === 0 ? (
        <EmptyState
          title="No outings match your search"
          message="Try another word or clear the filters."
          actionText="Clear filters"
          onAction={clearFilters}
        />
      ) : (
        visibleOutings.map((outing) => (
          <OutingCard key={outing.id} outing={outing} onOpen={openOutingDetails} />
        ))
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.error,
    fontSize: sizes.body,
    marginBottom: 12,
  },
  newButton: {
    marginBottom: 16,
  },
  label: {
    fontSize: sizes.label,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  listSpacer: {
    height: 12,
  },
});
